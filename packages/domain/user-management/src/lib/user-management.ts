import { User, UserRole, ApiResponse } from '@react-demo/types';
import { apiClient } from '@react-demo/api-client';

// ============================================================================
// User Service - Domain logic for user management
// ============================================================================

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface UserFilters {
  role?: UserRole;
  search?: string;
  page?: number;
  pageSize?: number;
}

// ============================================================================
// User Service Class
// ============================================================================

export class UserService {
  private baseUrl = '/users';

  /**
   * Get all users with optional filters
   */
  async getUsers(filters?: UserFilters): Promise<User[]> {
    const params = new URLSearchParams();

    if (filters?.role) params.append('role', filters.role);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    const response = await apiClient.get<ApiResponse<User[]>>(url);
    return response.data;
  }

  /**
   * Get a single user by ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>(
      this.baseUrl,
      userData
    );
    return response.data;
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.baseUrl}/${id}`,
      userData
    );
    return response.data;
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      `${this.baseUrl}/me`
    );
    return response.data;
  }

  /**
   * Update current user profile
   */
  async updateCurrentUser(userData: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${this.baseUrl}/me`,
      userData
    );
    return response.data;
  }
}

// ============================================================================
// User Validation Logic
// ============================================================================

export const userValidation = {
  /**
   * Validate user role
   */
  isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  },

  /**
   * Validate user role
   */
  isCustomer(user: User): boolean {
    return user.role === UserRole.CUSTOMER;
  },

  /**
   * Check if user can manage other users
   */
  canManageUsers(user: User): boolean {
    return user.role === UserRole.ADMIN;
  },

  /**
   * Check if user can edit profile
   */
  canEditProfile(currentUser: User, targetUserId: string): boolean {
    return currentUser.id === targetUserId || currentUser.role === UserRole.ADMIN;
  },

  /**
   * Check if user can delete account
   */
  canDeleteUser(currentUser: User, targetUserId: string): boolean {
    if (currentUser.role !== UserRole.ADMIN) return false;
    // Admin cannot delete themselves
    return currentUser.id !== targetUserId;
  },
};

// ============================================================================
// User Utilities
// ============================================================================

export const userUtils = {
  /**
   * Get user's full name
   */
  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  },

  /**
   * Get user's initials
   */
  getInitials(user: User): string {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  },

  /**
   * Get user role display name
   */
  getRoleDisplayName(role: UserRole): string {
    const roleNames: Record<UserRole, string> = {
      [UserRole.ADMIN]: 'Administrator',
      [UserRole.CUSTOMER]: 'Customer',
      [UserRole.GUEST]: 'Guest',
    };
    return roleNames[role];
  },

  /**
   * Format user for display
   */
  formatUser(user: User): string {
    return `${this.getFullName(user)} (${user.email})`;
  },
};

// Export singleton instance
export const userService = new UserService();

