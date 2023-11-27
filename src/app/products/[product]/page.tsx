export default function Page({ params }: { params: { product: string } }) {
  return <div style={{ fontSize: "20rem" }}>My Post: {params.product}</div>;
}
