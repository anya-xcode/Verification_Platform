export declare class AuthService {
    register(email: string, password: string, name: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    private generateToken;
}
export declare const authService: AuthService;
//# sourceMappingURL=authService.d.ts.map