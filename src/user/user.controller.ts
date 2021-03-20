import { Get } from "@tsoa/runtime";
import { Path } from "@tsoa/runtime";
import { SuccessResponse } from "@tsoa/runtime";
import { Body } from "@tsoa/runtime";
import { Post } from "@tsoa/runtime";
import { Controller } from "@tsoa/runtime";
import { Route } from "@tsoa/runtime";
import { IUser } from "./user.model";
import { UserCreationParams, UserService } from "./user.service";

@Route('/users')
export class UserController extends Controller{

    @Get('{userId}')
    public async getUSer(@Path() userId: number): Promise<IUser>{
        return new UserService().get(userId);
    }

    @SuccessResponse(201, 'User created')
    @Post()
    public async createUser(@Body() userCreationParams: UserCreationParams): Promise<void>{
        this.setStatus(201);
        new UserService().create(userCreationParams)
        return;
    }
}