import "./Product.css"
import { Card, Typography } from "antd"
import Meta from "antd/es/card/Meta"

function Product({ product, loading }) {
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <img
                    alt={product.title}
                    src={product.images[0]}
                />
            }
            actions={[
                <Typography.Text>{product.price}$</Typography.Text>
            ]}
            loading={loading}
        >
            <Meta
                title={product.title}
                description={product.description}
            />
        </Card>
    )
}

export default Product
