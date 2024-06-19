import "./Product.css"
import { Card, Typography } from "antd"
import Meta from "antd/es/card/Meta"

function Product({ product, loading }) {
    // The image is in this form ["Image_1_URL","Image_2_URL"] so, we needs to extract the URL
    const regex = /\["([^"]+)"\]/g;
    let match = regex.exec(product.images[0]);
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <img
                    alt={product.title}
                    src={match ? match[1] : product.images[0]}
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
