const mongoose = require('mongoose');

module.exports = () => {

	const connect = () => {
		mongoose.connect(
			'mongodb://sskim:sskim91@localhost:27017/admin',
			{
				dbName: 'recipe_db',
				useNewUrlParser: true,
				useUnifiedTopology: true
			}, (error) => {
				if (error) {
					console.error('몽고디비 연결 에러', error);
				} else {
					console.log('몽고디비 연결 성공');
				}
			});
	}

	connect();

	mongoose.connection.on('error', (error) => {
		console.error('몽고디비 연결 에러', error);
	});
	mongoose.connection.on('disconnected', () => {
		console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
		connect();
	});

	require('./subscriber');
};
