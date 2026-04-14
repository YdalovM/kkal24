import type { MaterialArticlePath } from "@/content/article-what-is";
import { materialArticleWhatIsByPath } from "@/content/article-what-is";

type ArticleWhatIsBlurbProps = {
  path: MaterialArticlePath;
};

/** Короткая строка под H1: «термин — суть, зачем на странице» — см. `content/article-what-is.ts`. */
export function ArticleWhatIsBlurb({ path }: ArticleWhatIsBlurbProps) {
  const text = materialArticleWhatIsByPath[path];
  return (
    <div className="article-what-is-blurb">
      <p className="article-what-is-blurb__text">{text}</p>
    </div>
  );
}
