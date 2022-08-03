import { client } from "src/lids/client";
import { GetStaticProps, NextPage } from "next";
import React from "react";
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
  return (
    <div>
      <p className="text-gray-400">{`記事の総数: ${props.totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            //type Blogを定義したので、content.titleとcontent.bodyを使える
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl text-blue-800 hover:text-blue-400">{content.title}</a>
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
