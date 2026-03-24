import { SerializedUser, User, UserDocument } from "@/lib/db/models/user";
import { connectDB } from "@/lib/db/mongoose";

function serialize(user: UserDocument): SerializedUser {
  return {
    _id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

class UsersService {
  private async connect() {
    await connectDB();
  }

  async create(email: string, hashedPassword: string): Promise<SerializedUser> {
    await this.connect();
    const user = await User.create({ email, hashedPassword });
    return serialize(user);
  }

  async updatePassword(
    id: string,
    hashedPassword: string,
  ): Promise<SerializedUser | null> {
    await this.connect();
    const user = (await User.findByIdAndUpdate(
      id,
      { hashedPassword },
      { new: true },
    ).lean()) as UserDocument | null;
    if (!user) return null;
    return serialize(user);
  }

  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    await this.connect();
    return User.findOne({ email }).lean() as Promise<UserDocument | null>;
  }
}

export const usersService = new UsersService();
