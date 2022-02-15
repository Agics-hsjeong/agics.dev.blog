<script>
  import { goto } from "$app/navigation";
  import ListErrors from "$lib/ListErrors.svelte";
  import { ajax } from "$lib/actions.js";
  import { post } from "$lib/utils.js";

  export let article;
  export let slug;
  let publishing = false;
  let errors;
  function add_tag(input) {
    article.tagList = [...article.tagList, input.value];
    input.value = "";
  }
  function remove(index) {
    article.tagList = [
      ...article.tagList.slice(0, index),
      ...article.tagList.slice(index + 1),
    ];
  }
  const onsubmit = async () => {
    publishing = true;

    const response = await post(`/article.json`, { article });

    // TODO handle network errors
    errors = response.errors;

    console.log(response);
  };
  const onresponse = async (res) => {
    if (res.ok) {
      goto(res.headers.get("location"));
    }
  };
  function enter(node, callback) {
    function onkeydown(event) {
      if (event.which === 13) callback(node);
    }
    node.addEventListener("keydown", onkeydown);
    return {
      destroy() {
        node.removeEventListener("keydown", onkeydown);
      },
    };
  }
</script>

<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ListErrors {errors} />

        <!-- <form
          action={slug ? `/article/${slug}.json?_method=put` : `/article.json`}
          method="post"
          use:ajax={{ onsubmit, onresponse }}
        > -->
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="제목"
                bind:value={article.title}
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="이 글은 무엇에 관한 것입니까?"
                bind:value={article.description}
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="글을 작성해주세요."
                bind:value={article.body}
              />
            </fieldset>

            <fieldset class="form-group">
              <div class="tag-list">
                {#each article.tagList as tag, i}
                  <span class="tag-default tag-pill">
                    <i class="ion-close-round" on:click={() => remove(i)} />
                    {tag}
                  </span>
                {/each}
              </div>

              <input
                class="form-control"
                type="text"
                placeholder="태그를 작성하고 엔터를 눌려주세요!"
                use:enter={add_tag}
              />
            </fieldset>

            <input
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
              disabled={publishing}
              value="글작성"
              on:click={onsubmit}
            />
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
