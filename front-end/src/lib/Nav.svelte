<script>
  import { page, session } from "$app/stores";
</script>

<nav class="navbar navbar-light">
  <div class="container">
    <a rel="prefetch" class="navbar-brand" href="/">개발자 블로그</a>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a
          rel="prefetch"
          class="nav-link"
          class:active={$page.url.pathname === "/"}
          href="/">홈</a
        >
      </li>

      {#if $session.user}
        <li class="nav-item">
          <a
            rel="prefetch"
            href="/editor"
            class="nav-link"
            class:active={$page.url.pathname === "/editor"}
          >
            <i class="ion-compose" />&nbsp;글쓰기
          </a>
        </li>

        <li class="nav-item">
          <a
            rel="prefetch"
            href="/settings"
            class="nav-link"
            class:active={$page.url.pathname === "/settings"}
          >
            <i class="ion-gear-a" />&nbsp;설정
          </a>
        </li>

        <li class="nav-item">
          <a
            rel="prefetch"
            href="/profile/@{$session.user.username}"
            class="nav-link"
          >
            <!-- <img src={$user.image} class="user-pic" alt={$user.username}> -->
            {$session.user.username}
          </a>
        </li>
      {:else}
        <li class="nav-item">
          <a
            rel="prefetch"
            href="/login"
            class="nav-link"
            class:active={$page.url.pathname === "/login"}
          >
            Sign in
          </a>
        </li>

        <li class="nav-item">
          <a
            rel="prefetch"
            href="/register"
            class="nav-link"
            class:active={$page.url.pathname === "/register"}
          >
            Sign up
          </a>
        </li>
      {/if}
    </ul>
  </div>
</nav>
