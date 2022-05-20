import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <br />
            {postData.id}
            <br />
            {/* Replace {postData.date} with this */}
            <Date dateString={postData.date} />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <h3>
                <Link href={'/'}>
                    <a>Back to home</a>
                </Link>
            </h3>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}