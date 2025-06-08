$(function(){
    let idx;
    let docs = [];
    let $searchForm = $('#search-form');
    let $searchBox = $('#lunr-search');

    function lunr_search(term) {
        let $output = $('<ul id="search-results" class="list-group"></ul>');

        if(term) {            
            let results = idx.search(term);
            if(results.length > 0){
                results.forEach(function (result) {
                    console.log(result);

                    let doc = docs[result.ref];
                    if(doc) {
                        let url = doc.url;
                        let title = doc.title;
                        let matchScore = result.score * 100;
                        
                        let body;
                        let key = Object.keys(result.matchData.metadata)[0];
                        if(key) {
                            let content = result.matchData.metadata[key].body;
                            if(content) {
                                let pos = content.position[0];
                                body = '&hellip;' + doc.body.substring(pos[0] - 60, pos[0] + pos[1] + 60) + '&hellip;';
                            }
                            else {
                                body = doc.body.substring(0, 60) + '&hellip;';
                            }
                        }
                        else {
                            body = doc.body.substring(0, 60) + '&hellip;';
                        }
                        
                        // Highlight matches in snippet
                        let r = $(`<div><span class="body">${body}</span></div>`).mark(term);
                        $output.append(`<li class="lunr-search-result list-group-item">
                            <a href="${url}" class="lunr-search-result-anchor">
                                <span class="lunr-search-result-title">${title}</span>
                                <span class="lunr-search-result-excerpt">${r.html()}</span>
                            </a>
                        </li>`);
                    }
                });
            } 
            else {
                $output.html('<li class="lunr-search-result">No results found&hellip;</li>');
            }
        }
        
        bootbox.dialog({
            title: 'Search results',
            message: $output,
            size: 'lg',
            backdrop: true,
            onEscape: true,
            scrollable: true
        });
    }

    $.getJSON('./js/data/index.json', function(json){
        docs = json;

        idx = lunr(function () {
            this.ref('id');
            this.field('title');
            this.field('body');
            this.field('url');
            this.metadataWhitelist = ['position'];

            docs.forEach(function (doc) {
                this.add(doc);
            }, this);
        });
    }).fail(function(jqxhr, status, error){
        console.error(error);
    });

    $searchForm.on('submit', function(e) {
        e.preventDefault();

        lunr_search($searchBox.val());
    });
});