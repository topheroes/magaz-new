import { gql } from "@apollo/client";

/**
 * GraphQL запрос на категории
 */
export const QUERY_CATEGORY_LIST = gql`
    query GetCategoryList($hideEmpty: Boolean!) {
        productCategories(where: {hideEmpty: $hideEmpty}) {
            nodes {
                name
                productCategoryId
                image {
                    mediaDetails {
                        file
                    }
                }
            }
        }
    }`;

/**
 * GraphQL запрос на список товаров
 */
export const QUERY_PRODUCT_LIST = gql`
    query GetProductListQuery($categoryId: Int!) {
        products(where: {categoryId: $categoryId}) {
            nodes {
                databaseId
                name
                description
                image {
                    mediaDetails {
                        file
                    }
                }
                galleryImages {
                    nodes {
                        mediaDetails {
                            file
                        }
                    }
                }
                ... on VariableProduct {
                    variations {
                        nodes {
                            price
                            databaseId
                            name
                        }
                    }
                    attributes {
                        nodes {
                            attributeId
                            name
                            options
                        }
                    }
                }
                ... on SimpleProduct {
                    price
                }
            }
        }
    }`;

/**
 * GraphQL мутация для регистрации пользователя
 */
export const MUTATION_REGISTER_USER = gql`
    mutation RegisterUser($uuid: String!, $username: String!, $password: String!, $email: String!) {
        registerUser(
        input: {
            clientMutationId: $uuid,
            username: $username,
            password: $password,
            email: $email
        }) {
            user {
                jwtAuthToken
                jwtRefreshToken
            }
        }
    }
`;

/**
 * GraphQL мутация для входа
 */
export const MUTATION_LOGIN_USER = gql`
    mutation LoginUser($uuid: String!, $username: String!, $password: String!) {
        login( input: {
            clientMutationId: $uuid,
            username: $username,
            password: $password
        }) {
            authToken
            refreshToken
            user {
                databaseId
                username
                email
            }
        }
    }
`;