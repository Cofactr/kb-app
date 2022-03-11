import Item from "components/dom/Item";

function Page({ org }) {
    return <Item data={org} />;
}

export async function getServerSideProps({ query: { oid } }) {
    const res = await fetch(`http://127.0.0.1:5000/organizations/${oid}`);
    const org = await res.json();

    return {
        props: {
            org: org.data,
        },
    };
}

export default Page;
