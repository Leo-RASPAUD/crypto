const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;

const preSave = function preSave(next) {
    const user = this;

    try {
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }

        // generate a salt
        return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) {
                return next(err);
            }

            // hash the password along with our new salt
            return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
                if (err) {
                    return next(hashErr);
                }
                // override the cleartext password with the hashed one
                user.password = hash;
                return next();
            });
        });
    } catch (e) {
        throw new Error('Fail to pre-save :', e.message);
    }
};

const comparePassword = function comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};

/** *********************
 * Export               *
 ************************
 */
module.exports = {
    preSave,
    comparePassword,
};