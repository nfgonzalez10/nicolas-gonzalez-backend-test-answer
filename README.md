# nicolas-gonzalez-backend-test-answer

This repo shows the implementation for the meridian group's problem

## Getting Started

### Prerequisites

What things you need to install the software and how to install them

```
node -v 14
```
or

```
docker and docker-compose
```

### Installing

```
npm install
```

or

```
docker-compose up
```

## Start

```
npm run start
```

or

```
docker-compose up
```

## How does it work?

When the server is up. You can follow the next steps to test the server app:

- Create token to access to the server. (Use this token for all the endpoint as _Bearer token_ )

```
GET http://localhost:3000/api/v1/identify/token
```

- Create an user. Save userId

```
POST http://localhost:3000/api/v1/identify/user
```

- Create products in your database. (Created by the system for test)

```
POST http://localhost:3000/api/v1/products/
```

- Get all the products. Get the id of the product.

```
GET http://localhost:3000/api/v1/products/
```

- Add product to your purchase

```
PUT http://localhost:3000/api/v1/purchases/users/<userId>/products/<productId>

Body: {quantity: number}

response -> {
    "_id": "63e573fb462f321abdd71d2f",
    "userId": "63e510feea843d6c675af123",
    "createdAt": 1675981819629,
    "products": [
        {
            "productId": "63e46761fe560be4760fa5d3",
            "quantity": 8
        }
    ],
    "status": "CURRENT",
    "updatedAt": 1675981819802
}

curl --location --request PUT 'http://localhost:3000/api/v1/purchases/users/63e510feea843d6c675af123/products/63e46761fe560be4760fa5d3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNjc1OTExMTg0MTQwLCJ1c2VyRW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9LCJpYXQiOjE2NzU5MTExODR9.IN5fptxjL8d9ximdT8-G0R0dlLeQMS9F3DN3dewg8jA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "quantity": 4
}
```

- Generate a new coupon (Save the cuponId _\_id_)

```
POST http://localhost:3000/api/v1/coupons

response {
    "_id": "63e56de920b88b963e014109",
    "code": "1eaa52d1-f361-4ae4-b5a0-2b6abc92c0bb",
    "createdAt": 1675980265819,
    "from": 1675980265819,
    "until": 1678608265819,
    "discount": 72
}
```

- Add coupon to the CURRENT purshase

```
PUT http://localhost:3000/api/v1/purchases/baskets/<basketId>/coupon/<cupon-code>

```

- Make payment of the CURRENT purchases

```
PUT http://localhost:3000/api/v1/payments/users/63e510feea843d6c675af123
```

- Get the billing of the purchase

```
GET http://localhost:3000/api/v1/billing/baskets/<basketId>

RESPONSE {
    "_id": "63e5746b462f321abdd71d31",
    "basketId": "63e573fb462f321abdd71d2f",
    "Galletas - 63e46761fe560be4760fa5d3": {
        "quantity": 8,
        "price": 1.2,
        "totalPrice": 9.6
    },
    "totalDiscount": 0,
    "totalBilling": 9.6,
    "totalToPay": 9.6
}
```
