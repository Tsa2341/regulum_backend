import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	limits: {
		files: 1,
		fileSize: 1024 * 1024,
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(
			null,
			file.fieldname +
				'-' +
				datetimestamp +
				'.' +
				file.originalname.split('.')[file.originalname.split('.').length - 1],
		);
	},
});

const fileFilter = (req, file, cb) => {
	var ext = path.extname(file.originalname).toLowerCase();
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return cb(new Error('Only images are allowed'));
	}
	cb(null, true);
};

const upload = multer({
	fileFilter: fileFilter,
	storage: storage,
});

export default upload;
