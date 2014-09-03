(function (window, _, $) {
  'use strict';

  var DEFAULT_OPTIONS = {
    auto_ids:       true,
    enable_coderay: true
  };

  var DEFAULT_STYLES = [
    'body {',
    '  font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;',
    '  padding: 2.5% 5%;',
    '}',
    '',
    'img {',
    '  display: block;',
    '  margin: 0 auto;',
    '}'
  ].join('\n');

  var DEFAULT_EDITOR = [
    '# Welcome!',
    '',
    'This is an online [Markdown](http://en.wikipedia.org/wiki/Markdown)',
    'editor. Whatever Markdown text you write here gets transformed into',
    'HTML that gets displayed on the right.',
  ].join('\n');


  var $openMd   = $('#open-md-link');
  var $saveMd   = $('#save-md-link');
  var $saveHtml = $('#save-html-link');
  var $options  = $('#options-form');
  var $styles   = $('#styles-contents');
  var $editor   = $('#editor-contents');
  var $preview  = $('#preview-contents').contents();
  var $tooltips = $('[data-toggle="tooltip"]');

  var _options  = null;


  var refresh = function () {
    $editor.trigger('input');
  };

  var readData = (function () {
    var $input = $('<input type="file"/>')
      .hide()
      .appendTo('body');

    return function (filter, callback) {
      $input.on('change', function (evt) {
        var files = evt.target.files;
        var file  = _.first(files);

        var reader = new window.FileReader();
        reader.addEventListener('load', function (evt) {
          var data = evt.target.result;
          callback(data);
        });

        reader.readAsText(file);
      });

      $input.attr('accept', filter);
      $input.get(0).click();
    };
  })();

  var saveData = (function () {
    var $a = $('<a/>')
      .hide()
      .appendTo('body');

    return function (data, filename) {
      var blob = new window.Blob([data], {type: 'octet/stream'});
      var url  = window.URL.createObjectURL(blob);

      $a.attr('href', url);
      $a.attr('download', filename);
      $a.get(0).click();

      window.URL.revokeObjectURL(url);
    };
  })();

  // Options.

  var saveOptions = function (data) {
    if (localStorage) {
      localStorage.options = JSON.stringify(data);
    }
  };

  var loadOptions = function () {
    return localStorage && JSON.parse(localStorage.options || null) || DEFAULT_OPTIONS;
  };

  // Styles.

  var getNormalize = _.once(function () {
    return $.get('normalize-css/normalize.css');
  });

  var injectNormalize = function () {
    getNormalize().done(function (data) {
      $preview.find('#normalize')
        .replaceWith('<style id="normalize">' + data + '</style>');
    });
  };

  var injectStyles = function (data) {
    $preview.find('#styles')
      .replaceWith('<style id="styles">' + data + '</style>');
  };

  var saveStyles = function (data) {
    if (localStorage) {
      localStorage.styles = data;
    }
  };

  var loadStyles = function () {
    return localStorage && localStorage.styles || DEFAULT_STYLES;
  };

  // Editor.

  var saveEditor = function (data) {
    if (localStorage) {
      localStorage.editor = data;
    }
  };

  var loadEditor = function () {
    return localStorage && localStorage.editor || DEFAULT_EDITOR;
  };

  // Ajax callbacks.

  var onTransformSuccess = function (html) {
    $preview.find('body')
      .html(html);

    $preview.find('a')
      .click(function (evt) {
        evt.preventDefault();
      });

    $preview.find('title')
      .text($preview.find('h1:first').text());
  };

  var onTransformError = function (err) {
    $preview.find('body')
      .html(err);
  };

  // Event handlers.

  var onOpenMdClick = function (evt) {
    evt.preventDefault();

    readData('.md', function (data) {
      $editor
        .val(data)
        .trigger('input');
    });
  };

  var onSaveMdClick = function (evt) {
    evt.preventDefault();

    var editor = $editor.val();
    saveData(editor, 'index.md');
  };

  var onSaveHtmlClick = function (evt) {
    evt.preventDefault();

    var preview = $preview.find('html').get(0).outerHTML;
    saveData(preview, 'index.html');
  };

  var onOptionsChange = function (evt) {
    var $option = $(evt.target);
    _options[$option.attr('name')] = $option.prop('checked');
    saveOptions(_options);
    refresh();
  };

  var onStylesInput = function () {
    var styles = $styles.val();
    saveStyles(styles);
    injectStyles(styles);
  };

  var onEditorInput = function () {
    var editor = $editor.val();
    saveEditor(editor);

    var data = {
      options: _options,
      source:  editor
    };

    $.post('/transform', data)
      .done(onTransformSuccess)
      .fail(onTransformError);
  };

  // Initializers.

  var initializeOpenMd = function () {
    $openMd
      .on('click', onOpenMdClick);
  };

  var initializeSaveMd = function () {
    $saveMd
      .on('click', onSaveMdClick);
  };

  var initializeSaveHtml = function () {
    $saveHtml
      .on('click', onSaveHtmlClick);
  };

  var initializeOptions = function () {
    _options = loadOptions();

    _.each(_options, function (value, name) {
      $options.find('[name="' + name + '"]')
        .prop('checked', !!value);
    });

    $options
      .on('change', onOptionsChange);
  };

  var initializeStyles = function () {
    var styles = loadStyles();

    $styles
      .on('input', _.debounce(onStylesInput, 500))
      .val(styles)
      .trigger('input');
  };

  var initializeEditor = function () {
    var editor = loadEditor();

    $editor
      .on('input', _.debounce(onEditorInput, 500))
      .val(editor)
      .trigger('input');
  };

  var initializePreview = function () {
    $preview.find('head')
      .append('<meta charset="utf-8"/>')
      .append('<meta content="width=device-width, initial-scale=1.0" name="viewport"/>')
      .append('<title/>')
      .append('<style id="normalize"/>')
      .append('<style id="styles"/>');

    injectNormalize();
  };

  var initializeTooltips = function () {
    $tooltips.tooltip();
  };

  // Start the fun.

  initializeOpenMd();
  initializeSaveMd();
  initializeSaveHtml();
  initializeOptions();
  initializeStyles();
  initializeEditor();
  initializePreview();
  initializeTooltips();

})(window, window._, window.$);
