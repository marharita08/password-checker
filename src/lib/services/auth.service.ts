import bcrypt from "bcryptjs";
import { usersService } from "@/lib/services/users.service";

class AuthService {
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersService.create(email, hashedPassword);
    return user;
  }
}

export const authService = new AuthService();
