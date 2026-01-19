import { usersDao } from '../daos/index.js';
import { encryptPassword } from '../utils/bcrypt.js';
import logger from '../utils/logger.js';

export const seedAdmin = async () => {
    try {
        if (!usersDao) {
            logger.warn('[SEEDER]: ⚠️ usersDao no está inicializado aún.');
            return;
        }

        const adminEmail = 'admin';
        const existingAdmin = await usersDao.findByEmail(adminEmail);

        if (!existingAdmin) {
            logger.info('[SEEDER]: 👤 Creando usuario administrador por defecto...');
            const passwordHash = await encryptPassword('admin');

            const newAdmin = {
                name: 'Administrator',
                email: adminEmail,
                password: passwordHash,
                image: '',
                account: {
                    confirmed: true,
                    code: '0000',
                    admin: true
                }
            };

            await usersDao.create(newAdmin);
            logger.info('[SEEDER]: ✅ Usuario administrador creado con éxito: admin / admin');
        } else {
            logger.info('[SEEDER]: ℹ️ El usuario administrador ya existe.');
        }
    } catch (error) {
        logger.error(`[SEEDER]: ❌ Error al crear usuario administrador: ${error.message}`);
    }
};
