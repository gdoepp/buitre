export * from './pgp.service';
import { PgpService } from './pgp.service';
export * from './token.service';
import { TokenService } from './token.service';
export const APIS = [PgpService, TokenService];
