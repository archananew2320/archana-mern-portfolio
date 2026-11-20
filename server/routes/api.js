import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { getPortfolio, getProjects, getProject, createMessage } from '../controllers/portfolioController.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again later.' },
});

router.get('/portfolio', getPortfolio);
router.get('/projects', getProjects);
router.get('/projects/:id', getProject);
router.post('/contact', contactLimiter, createMessage);

export default router;
