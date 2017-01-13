<div class="text-center">
    <?php if (isset($_authCode)) { ?>
        <h2>Authorised Successfully</h2>
        <span class="auth_code_variable"><?= $_authCode ?></span>
    <?php } elseif (isset($_errorCode)) { ?>
        <h2>An Error Occurred</h2>
        <code><?= $_errorCode ?></code>
    <?php } else { ?>
        <h2>Authenticate User</h2>
        <a href="https://trakt.tv/oauth/authorize?client_id=<?= $this->config->item('trakt_client_id') ?>&redirect_uri=<?= urlencode(base_url('/authenticate/')) ?>&response_type=code"
           class="btn btn-default">
            <span class="fa fa-sign-in fa-fw"></span> Authenticate on Trakt
        </a>
    <?php } ?>
</div>