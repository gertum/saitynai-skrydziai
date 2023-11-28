<?php

namespace Tests\Draft;

use PHPUnit\Framework\TestCase;

class TestSession extends TestCase
{
    public function testSession() {
        $serialized = 'a:4:{s:6:"_token";s:40:"gOXHz08RWl4eM3Xc2ndWSYGO7OkXOjtKAKtU3XTD";s:9:"_previous";a:1:{s:3:"url";s:24:"http://saitynai.dv/login";}s:6:"_flash";a:2:{s:3:"old";a:0:{}s:3:"new";a:0:{}}s:50:"login_web_59ba36addc2b2f9401580f014c7f58ea4e30989d";i:1;}';

        $unserialized = unserialize($serialized);

        var_dump ( $unserialized );
    }

}
