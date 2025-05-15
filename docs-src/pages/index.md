---
layout: default
title: 
pageKey: index
permalink: /
---

<header class="marque-header mb-5 lead">
    <div class="container text-center">
        <h1>
            <b class="text-bb-brand">Bootbox</b><span>.js</span>
        </h1>
        <h3 class="mb-4">
            Bootstrap modals made easy.
        </h3>
        <p class="lead-2">
            <b>Bootbox.js</b> is a small JavaScript library which allows you to create programmatic dialog boxes
            using
            <a href="https://getbootstrap.com/docs/5.3/components/modal/">Bootstrap modals</a>, without having to worry about
            creating, managing, or removing any of the required DOM elements or JavaScript event handlers.
        </p>            
        <p>
            <a class="text-no-decoration" href="https://www.npmjs.com/package/bootbox">
                <samp class="bg-brand p-2 rounded">npm i bootbox</samp>
            </a>
            <span class="mx-2">&bull;</span>
            <a class="text-no-decoration" href="https://cdnjs.com/libraries/bootbox.js">
                <samp class="bg-brand p-2 rounded">cdnjs</samp>
            </a>                
        </p>
    </div>
</header>

<div class="bg-white rounded p-5">
    <section class="page-section">
        <h3 class="page-section-header mb-3">Flexible Bootstrap-style dialogs</h3>
        <div class="mb-4">
            <p>
                Bootbox provides three functions, <samp>alert()</samp>, <samp>confirm()</samp>, and <samp>prompt()</samp>, whose aim is to
                mimic their native JavaScript equivalents. Here's the simplest possible example:
            </p>
            <pre class="language-js line-numbers"><code>bootbox.alert(<span class="bb-code-string">"Hello&nbsp;world!"</span>);</code></pre>        
            <button type="button" class="bb-hello-world btn btn-primary btn-lg">Run example</button>
        </div>
        <p>
            <b>Compare that to the code you'd have to write without Bootbox:</b>
        </p>
        <div class="mb-4">
            <pre class="language-html line-numbers"><code>&lt;!-- set up the modal to start hidden and fade in and out --&gt;
&lt;div id="myModal" class="modal fade"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;!-- dialog body --&gt;
            &lt;div class="modal-body"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&amp;times;&lt;/button&gt;
                Hello world!
            &lt;/div&gt;
            &lt;!-- dialog buttons --&gt;
            &lt;div class="modal-footer"&gt;&lt;button type="button" class="btn btn-primary"&gt;OK&lt;/button&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
    
&lt;!-- sometime later, probably inside your on load event callback --&gt;
&lt;script&gt;
    $("#myModal").on("show.bs.modal", function() {      // wire up the OK button to dismiss the modal when shown
        $("#myModal .modal-footer .btn").on("click", function(e) {
            console.log("button pressed");              // just as an example...
            $("#myModal").modal('hide');                // dismiss the dialog
        });
    });
        
    $("#myModal").on("hide.bs.modal", function() {      // remove the event listeners when the dialog is dismissed
        $("#myModal a.btn").off("click");
    });
            
    $("#myModal").on("hidden.bs.modal", function() {    // remove the actual elements from the DOM when fully hidden
        $("#myModal").remove();
    });
            
    $("#myModal").modal({                               // wire up the actual modal functionality and show the dialog
        "backdrop"  : "static",
        "keyboard"  : true,
        "show"      : true                              // ensure the modal is shown immediately
    });
&lt;/script&gt;</code></pre>
        </div>
        <h3 class="page-section-header mb-3">Build Your Own Dialogs!</h3>
        <p>
            Each Bootbox function calls a fourth public function, <samp>dialog()</samp>,
            which you can use to create your own custom dialogs. See the <a href="./documentation">Documentation</a>
            page for usage and to learn which options are available for each function.
        </p>
    </section>
    
    <hr class="section-divider" />
    
    <section class="page-section">
        <h3 class="page-section-header mb-3">Ready To Get Started?</h3>
        <p>
            Head on over to the <a href="./getting-started">Getting Started</a> page, where you'll find the information
            you need to start using Bootbox, including the versions of Bootstrap we support and options for adding
            Bootbox to your project.
        </p>
    </section>

    <footer class="page-footer">
        <div class="row">
            <div class="col">
                <a class="btn btn-outline-secondary disabled">
                    Home
                </a>
            </div>
            <div class="col">
                <a href="./getting-started" class="btn btn-outline-info">Getting Started <i class="fas fa-angle-double-right"></i></a>
            </div>
        </div>
    </footer>
</div>