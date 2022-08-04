import { client } from "src/lids/client";
import { GetStaticProps, NextPage } from "next";
import React, { ComponentProps, useState } from "react";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

export type Blog = {
  title: string;
  body: string;
};

//getStaticPropsのdataの返り値から取得
//MicroCMSListResponseには１つ型引数が必要
type Props = MicroCMSListResponse<Blog>;

//NextPageにGenericsを渡すことで、Propsの型を指定できる
const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();
  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = () =>
    setSearch(undefined);

  //contentsに値が入ってくる
  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;
  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <label>
          <input type="text" name="query" className="border-black- border" />
          <button type="submit" className="border-black- border px-2">
            検索
          </button>
          <button type="reset" onClick={handleClick} className="border-black- border px-2">
            リセット
          </button>
        </label>
      </form>
      <p className="mt-4 text-gray-400">{`${
        search ? "検索結果" : "記事の総数"
      }: ${totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {contents.map((content) => {
          return (
            //type Blogを定義したので、content.titleとcontent.bodyを使える
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl text-blue-800 hover:text-blue-400">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
  });
  return {
    props: data,
  };
};
export default Home;
