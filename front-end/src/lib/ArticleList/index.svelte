<script>
  import { session } from "$app/stores";
  import ArticlePreview from "./ArticlePreview.svelte";

  export let articles;
</script>

{#if articles.length === 0}
  <div class="article-preview">아직 즐겨찾기가 된 글이 없습니다.</div>
{:else}
  <div>
    {#each articles as article (article.slug)}
      <ArticlePreview {article} user={$session.user} />
    {/each}
  </div>
{/if}
