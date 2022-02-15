<script context="module">
  export function load({ session }) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "/login",
      };
    }

    return {
      props: { user },
    };
  }
</script>

<script>
  import { session } from "$app/stores";
  import ListErrors from "$lib/ListErrors.svelte";
  import { post } from "$lib/utils.js";

  export let user;

  let in_progress;
  let errors;

  async function logout() {
    await post(`auth/logout`);

    // this will trigger a redirect, because it
    // causes the `load` function to run again
    $session.user = null;
  }

  async function save() {
    in_progress = true;

    const response = await post(`auth/save`, user);

    console.log(user);

    errors = response.errors;
    if (response.user) $session.user = response.user;

    in_progress = false;
  }
</script>

<svelte:head>
  <title>설정 • 개발자 블로그</title>
</svelte:head>

<div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">설정</h1>

        <ListErrors {errors} />

        <form on:submit|preventDefault={save}>
          <fieldset>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="프로필 사진의 URL"
                bind:value={user.image}
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="닉네임"
                bind:value={user.username}
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="나의 소개"
                bind:value={user.bio}
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="이메일"
                bind:value={user.email}
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="새로운 패스워드"
                bind:value={user.password}
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={in_progress}
            >
              수정하기
            </button>
          </fieldset>
        </form>

        <hr />

        <button class="btn btn-outline-danger" on:click={logout}>
          로그아웃
        </button>
      </div>
    </div>
  </div>
</div>
