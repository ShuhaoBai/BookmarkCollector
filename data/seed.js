const dbConnection = require('./connection');
const mongoCollections = require("./collections.js");
const bookmark = require("./bookmark.js");
const register = require("./register.js");
const users = mongoCollections.Users;
const bookmarkCategories = mongoCollections.Bookmark_category;
const ObjectId = require("mongodb").ObjectId;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let userTony = await register.create("Tony", "Stark", "45", "Male", "New York", "NY", "US", "tony-stark@avengers.com", "201-111-1111", "iamironman123");

    await bookmark.addBookmark("search", "Google search engine", "https://www.google.com", userTony._id.toString());
    await bookmark.addBookmark("search", "Baidu search engine, it searches Chinese characters well", "https://www.baidu.com", userTony._id.toString());
    await bookmark.addBookmark("search", "Microsoft search engine, it is okay but its marketshare is so sad", "https://www.bing.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Game of Throne", "https://www.gameofthrone.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Silicon Valley", "https://www.thesiliconvalley.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Westworld", "https://www.westworld.com", userTony._id.toString());
    await bookmark.addBookmark("movie", "Avenger Endgame", "https://www.wikiwand.com/en/Avengers:_Endgame", userTony._id.toString());

    console.log("Done seeding database");
    await db.serverConfig.close();
}

main().catch(console.log);