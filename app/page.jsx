import { Feed } from "@/components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI-Powered Prompt</span>
      </h1>
      <Feed></Feed>
    </section>
  )
}
export default Home;
