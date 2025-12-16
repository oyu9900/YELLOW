import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Get("stats")
  @UseGuards(new RolesGuard(["admin"]))
  getStats() {
    return { secret: "Only admin can access this" };
  }
}
