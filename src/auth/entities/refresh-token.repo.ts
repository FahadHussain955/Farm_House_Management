import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {}
