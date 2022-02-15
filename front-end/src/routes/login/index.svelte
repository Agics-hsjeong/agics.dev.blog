<script context="module">
  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return {};
  }
</script>

<script>
  import { session } from "$app/stores";
  import { goto } from "$app/navigation";
  import { post } from "$lib/utils.js";
  import ListErrors from "$lib/ListErrors.svelte";

  let email = "";
  let password = "";
  let errors = null;

  async function submit(event) {
    const response = await post(`auth/login`, { email, password });

    // TODO handle network errors
    errors = response.errors;

    if (response.user) {
      $session.user = response.user;
      goto("/");
    }
  }
</script>

<svelte:head>
  <title>로그인 • 개발자 블로그</title>
</svelte:head>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">로그인</h1>
        <p class="text-xs-center">
          <a href="/register">계정이 없습니까?</a>
        </p>

        <ListErrors {errors} />

        <form on:submit|preventDefault={submit}>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="email"
              required
              placeholder="이메일"
              bind:value={email}
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="password"
              required
              placeholder="패스워드"
              bind:value={password}
            />
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
