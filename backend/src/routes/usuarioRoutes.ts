import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authenticateToken } from '../middleware/auth';
import { validateCreateUsuario, validateUpdateUsuario, validateLogin } from '../middleware/validation';

const router = Router();
const usuarioController = new UsuarioController();

// Rotas públicas
router.post('/login', validateLogin, usuarioController.login.bind(usuarioController));
router.post('/', validateCreateUsuario, usuarioController.create.bind(usuarioController));

// Rotas protegidas
router.get('/', usuarioController.findAll.bind(usuarioController));
router.get('/deleted', authenticateToken, usuarioController.findDeleted.bind(usuarioController));
router.get('/:id', usuarioController.findById.bind(usuarioController));
router.put('/:id', authenticateToken, validateUpdateUsuario, usuarioController.update.bind(usuarioController));
router.delete('/:id', authenticateToken, usuarioController.softDelete.bind(usuarioController));
router.patch('/:id/restore', authenticateToken, usuarioController.restore.bind(usuarioController));
router.delete('/:id/hard', authenticateToken, usuarioController.hardDelete.bind(usuarioController));

export default router;

