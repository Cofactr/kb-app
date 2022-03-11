import Item from "components/dom/kb/Item";
import { useEffect } from "react";
import useItemStore from "store/useItemStore";

function Page({ product }) {
    const { addItem, items, selectItem } = useItemStore();

    useEffect(() => {
        addItem(product);
        selectItem(product._id);
    }, [addItem, product, selectItem]);

    const item = items.get(product._id);

    return item ? (
        <Item data={item} />
    ) : (
        <div className="w-full mt-12">
            <p className="text-center text-red">Item not found</p>
        </div>
    );
}

export async function getServerSideProps({ query: { pid } }) {
    const res = await fetch(`http://127.0.0.1:5000/products/${pid}`);
    const product = await res.json();

    return {
        props: {
            product: product.data,
        },
    };
}

export default Page;
