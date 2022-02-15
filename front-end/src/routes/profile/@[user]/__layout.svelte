<script context="module">
  export async function load({ params, fetch }) {
    const res = await fetch(`/profile/@${params.user}.json`);

    return {
      props: {
        profile: await res.json(),
      },
    };
  }
</script>

<script>
  import { page, session } from "$app/stores";

  export let profile;

  // TODO would be nice to have a more idiomatic solution to this —
  // https://github.com/sveltejs/kit/issues/269
  $: segments = $page.url.pathname.split("/");
  $: is_favorites = segments.length === 4 && segments[3] === "favorites";
  $: is_user = $session.user && profile.username === $session.user.username;

  let current_token;
  async function toggle_following() {
    const token = (current_token = {});

    const { following, username } = profile;

    // optimistic UI
    profile.following = !profile.following;

    const res = await fetch(`/profile/@${username}/follow`, {
      method: following ? "delete" : "post",
    });

    const result = await res.json();

    // synchronise with the server, in case it disagrees
    // with our optimistic UI for some reason — but only
    // if the button wasn't re-toggled in the meantime
    if (token === current_token) {
      profile = result.profile;
    }
  }
</script>

<svelte:head>
  <title>{profile.username} • 개발자 블로그</title>
</svelte:head>

<div class="profile-page">
  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img src={profile.image} class="user-img" alt={profile.username} />
          <h4>{profile.username}</h4>
          <p>{profile.bio}</p>

          {#if is_user}
            <a
              href="/settings"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a" />
              프로필 설정 편집
            </a>
          {:else if $session.user}
            <button
              class="btn btn-sm action-btn {profile.following
                ? 'btn-secondary'
                : 'btn-outline-secondary'}"
              on:click={toggle_following}
            >
              <i class="ion-plus-round" />
              {profile.following ? "Unfollow" : "Follow"}
              {profile.username}
            </button>
          {:else}<a href="/login">팔로우하려면 로그인하세요.</a>{/if}
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a
                href="/profile/@{profile.username}"
                class="nav-link"
                rel="prefetch"
                class:active={!is_favorites}>글</a
              >
            </li>

            <li class="nav-item">
              <a
                href="/profile/@{profile.username}/favorites"
                class="nav-link"
                rel="prefetch"
                class:active={is_favorites}>즐겨찾기</a
              >
            </li>
          </ul>
        </div>

        <slot />
      </div>
    </div>
  </div>
</div>
