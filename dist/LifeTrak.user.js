// ==UserScript==
// @name         LifeTrak
// @namespace    PXgamer
// @version      0.1
// @description  Allows you to track what you watch on various sites using Trakt.tv
// @author       PXgamer
// @include      *lifetrak.pxgamer.xyz*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
/*jshint multistr: true */

(function () {
    'use strict';

    // NOTE: To set this up, run through the auth process here: https://lifetrak.pxgamer.xyz
    // This is just a project to add what you download to your Trakt.tv Collection. If you really want, you can set up your own auth server with: https://github.com/PXgamer/LifeTrak

    var baseUrl = 'https://lifetrak.pxgamer.xyz/'; // Used to change your server URL (requires trailing slash)

    // DO NOT EDIT BELOW THIS LINE
    // ---------------------------

    var authCode = GM_getValue('lifeTrakAuth', '');
    var traktApiBase = 'https://api.trakt.tv';
    var getURL = location.href.toLowerCase();
    var sendData;

    var authRegEx = new RegExp(baseUrl.toLowerCase() + 'authenticate(?:\/)?\\?code=.+', 'i');

    if (location.href == baseUrl) {
        var logInValid = false;
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader("trakt-api-key", "c818935fa3be2ae5902c3a642cc9d28bdfc282fb144154eea3867d47ef233d45");
                request.setRequestHeader("trakt-api-version", 2);
                request.setRequestHeader("Authorization", "Bearer " + authCode + "");
            },
            type: "GET",
            async: false,
            url: traktApiBase + "/sync/last_activities",
            success: function (data) {
                if (data.all !== '') {
                    logInValid = true;
                }
            },
            returnData: "json"
        });
        if (logInValid) {
            $('div.validation_check').replaceWith('<div class="validation_check alert alert-success">You have successfully authenticated your Trakt account.</div>');
        } else {
            $('div.validation_check').replaceWith('<div class="validation_check alert alert-danger">You are required to authenticate your Trakt account. Please click <a href="' + baseUrl + 'authenticate/' + '" class="alert-link">here</a>.</div>');
        }
    }
    if (authRegEx.test(getURL)) {
        GM_setValue('lifeTrakAuth', $('div span.auth_code_variable').text());

        location.href = baseUrl;
    }

    $('span.LifeTrak').on('click', function () {
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader("trakt-api-key", "c818935fa3be2ae5902c3a642cc9d28bdfc282fb144154eea3867d47ef233d45");
                request.setRequestHeader("trakt-api-version", 2);
                request.setRequestHeader("Authorization", "Bearer " + authCode + "");
            },
            type: "POST",
            url: traktApiBase + "/sync/collection",
            data: JSON.stringify(sendData),
            success: function (data) {
                console.log(data);
            },
            returnData: "json"
        });
    });
})();