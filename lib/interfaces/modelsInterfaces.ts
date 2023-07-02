export interface UserProps {
    id: number;
    email: string;
    name?: string;
    phone?: string;
    email_verified: boolean;
    password: string;
    role: Role;
    orders: OrderProps;
    ProductReview: ProductReviewProps;
    accounts: AccountProps;
    UserSession: SessionProps;
    products: ProductProps;
}

export interface AccountProps {
    id: number;
    userId: number;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    user: UserProps;
}

export interface UserRoleProps {
    id: number;
    name: string;
    RolePermission: RolePermissionProps;
}

enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    VENDOR = "VENDOR",
    PRODUCT_MANAGER = "PRODUCT_MANAGER",
    CALL_CENTER = "CALL_CENTER",
}

export interface RolePermissionProps {
    id: number;
    roleId: number;
    role: UserRoleProps;
    permission: string;
}

export interface SessionProps {
    id: number;
    sessionToken: string;
    userId: number;
    expires: Date;
    user: UserProps;
}

export interface VerificationTokenProps {
    id: number;
    identifier: string;
    token: string;
    expires: Date;
}

export interface ProductProps {
    id: number;
    name: string;
    slug: string;
    price: number;
    reduction?: number;
    isFeatured: boolean;
    isActive: boolean;
    sku?: string;
    quantity: number;
    description?: string;
    seoTitle?: string;
    seoDescription?: string;
    images: ProductImageProps[];
    variants: ProductVariantProps;
    categories: CategoryProps;
    Tags: TagProps;
    orders: OrderProps;
    userId: number;
    user: UserProps;
    ProductReview: ProductReviewProps;
    createdAt: Date;
    updatedAt: Date;
    weight?: number;
    dimensions?: string;
    brand?: string;
    manufacturer?: string;
    warranty?: string;
    features?: string;
}

export interface ProductVariantProps {
    id: number;
    productId: number;
    product: ProductProps;
    name: string;
    price: number;
    quantity: number;
    sku?: string;
    images: ProductImageProps;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductImageProps {
    id: number;
    productId: number;
    alt?: string;
    product: ProductProps;
    variantId?: number;
    variant?: ProductVariantProps;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryProps {
    id: number;
    name: string;
    slug: string;
    parent?: CategoryProps;
    parentId?: number;
    products: ProductProps;
    imageUrl?: string;
    childCategories: CategoryProps;
    isEnabled: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface TagProps {
    id: number;
    name: string;
    slug: string;
    products: ProductProps;
}

export interface BrandProps {
    id: number;
    name?: string;
    slug: string;
    website?: string;
    image?: string;
    description?: string;
    position: string;
    isEnabled: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface ProductReviewProps {
    id: number;
    productId: number;
    product: ProductProps;
    userId: number;
    user: UserProps;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderProps {
    id: number;
    createdAt: Date;
    userId: number;
    user: UserProps;
    products: ProductProps;
}

export interface PageProps {
    id: number;
    slug: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
