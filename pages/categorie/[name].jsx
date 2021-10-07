import { Layout } from "@components";
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/category.module.scss";

export default function CategoryPage() {
    return (
        <Layout>
            <main className={styles.categoryPage}>
                <h1>Tous les articles du "présent"</h1>
                <section>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <Image
                                src="https://picsum.photos/id/1055/1440"
                                alt="Random picture"
                                objectFit="cover"
                                layout="fill"
                            />
                            <span>présent</span>
                        </div>
                        <div>
                            <h2>Mon titre d'article</h2>
                            <p>
                                Evening, Doctor Brown, what's with the wire?
                                Yeah well look, Marvin, Marvin, you gotta play.
                                See that's where they kiss for the first time on
                                the dance floor.
                            </p>
                            <p>12 octobre 2020</p>
                        </div>
                    </article>
                </section>
            </main>
        </Layout>
    );
}
