'use strict';

$(function() {
  page.config({
    googleAnalyticsId: '',
    smoothScroll: true,
  });

  $('.bb-hello-world').on('click', function (e) {
    bootbox.alert('Hello world!');
  });
});

