var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Article(article){
	this.content = article.content;
	this.date = article.date;
	this.author = article.author;
	this.title = article.title;
}

module.exports = Article;

/*存入一条数据*/
Article.prototype.save = function(callback){
	var article = {
		title: this.title,
		content: this.content,
		date: this.date,
		author: this.author
	}
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		
		db.collection('articles',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.insert(article,{
				safe: true
			},function(err,articles){
				mongodb.close();
				if (err)
					return callback(err);
				callback(null,articles);
			})
		})
	})
}

/*获取所有文章*/
Article.getAll = function(name,callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}

		db.collection('articles',function(err,collection){
			if (err) {
				mongodb.close();
				return	callback(err);
			}

			collection.find({author: name}).sort({date:-1}).toArray(function(err,articles){
				mongodb.close();
				if (err) {
					return callback(err);
				}

				callback(null,articles);
			})
		})
	})
}

/*根据ID获取数据*/
Article.getArticleById = function(id,callback) {
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}

		db.collection('articles',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}

			console.log('ObjectId("'+id+'")');
			//var ObjectId = 'ObjectId("'+id+'")';
			collection.findOne({_id:ObjectID(id)},function(err,articles){
				mongodb.close();
				if (err) {
					return callback(err);
				}

				callback(null,articles);
			})
		})
	})
}

