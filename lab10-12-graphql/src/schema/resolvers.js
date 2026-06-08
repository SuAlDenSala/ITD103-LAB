const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');
const authorLoader = require('../dataloaders/authorLoader');
const { generateToken, authenticate, authorize } = require('../utils/auth');
const { pubsub, BOOK_ADDED, BOOK_UPDATED } = require('../pubsub');

const resolvers = {
  // Nested Resolvers mapping for express-graphql rootValue
  Book: {
    author: async (parent) => {
      return await authorLoader.load(parent.author);
    }
  },
  Author: {
    books: async (parent) => {
      return await Book.find({ author: parent._id });
    }
  },

  // Query resolvers
  books: async () => {
    try { return await Book.find(); } 
    catch (error) { throw new Error('Error fetching books'); }
  },
  book: async ({ id }) => {
    try {
      const book = await Book.findById(id);
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) { throw new Error('Error fetching book'); }
  },
  booksByGenre: async ({ genre }) => {
    try { return await Book.find({ genre }); } 
    catch (error) { throw new Error('Error fetching books by genre'); }
  },
  booksByAuthor: async ({ author }) => {
    try { return await Book.find({ author }); } 
    catch (error) { throw new Error('Error fetching books by author'); }
  },
  authors: async () => {
    try { return await Author.find(); } 
    catch (error) { throw new Error('Error fetching authors'); }
  },
  me: async (_, context) => {
    if (!context.user) throw new Error('Not authenticated');
    return await User.findById(context.user.userId);
  },
  users: async (_, context) => {
    if (!context.user) throw new Error('Not authenticated');
    authorize(context.user, 'admin');
    return await User.find();
  },

  // Mutation resolvers
  addBook: async ({ input }, context) => {
    try {
      const book = new Book(input);
      const savedBook = await book.save();
      pubsub.publish(BOOK_ADDED, { bookAdded: savedBook });
      return savedBook;
    } catch (error) { throw new Error('Error adding book'); }
  },
  updateBook: async ({ id, input }) => {
    try {
      const book = await Book.findByIdAndUpdate(
        id, { $set: input }, { new: true, runValidators: true }
      );
      if (!book) throw new Error('Book not found');
      pubsub.publish(BOOK_UPDATED, { bookUpdated: book });
      return book;
    } catch (error) { throw new Error('Error updating book'); }
  },
  deleteBook: async ({ id }) => {
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) { throw new Error('Error deleting book'); }
  },
  toggleStock: async ({ id }) => {
    try {
      const book = await Book.findById(id);
      if (!book) throw new Error('Book not found');
      book.inStock = !book.inStock;
      return await book.save();
    } catch (error) { throw new Error('Error toggling stock'); }
  },
  addBooks: async ({ books }) => {
    try { return await Book.insertMany(books); } 
    catch (error) { throw new Error('Error adding books'); }
  },
  register: async ({ input }) => {
    try {
      const user = new User(input);
      await user.save();
      const token = generateToken(user);
      return { token, user };
    } catch (error) { throw new Error('Error registering user'); }
  },
  login: async ({ input }) => {
    try {
      const user = await User.findOne({ email: input.email });
      if (!user) throw new Error('Invalid credentials');
      const isValid = await user.comparePassword(input.password);
      if (!isValid) throw new Error('Invalid credentials');
      const token = generateToken(user);
      return { token, user };
    } catch (error) { throw new Error('Error logging in'); }
  },
  updateRole: async ({ userId, role }, context) => {
    if (!context.user) throw new Error('Not authenticated');
    authorize(context.user, 'admin');
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  },

  // Subscription Resolvers
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
    },
    bookUpdated: {
      subscribe: () => pubsub.asyncIterator([BOOK_UPDATED])
    }
  }
};

module.exports = resolvers;
