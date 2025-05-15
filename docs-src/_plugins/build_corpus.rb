require 'pathname' 
require 'json' 
require 'nokogiri'
require 'loofah'

# Registers a Jekyll hook for building the search index for lunarjs.
#
# Creates the corpus (search index) by pulling the text content from each file in the `pages` directory.
# If the page contains HTML, the HTML is scrubbed prior to building the corpus entry.
# 
# The search index is written to the output directory for this Jekyll site, to simplify the build process.
Jekyll::Hooks.register :site, :post_write do |site|
    root = Pathname.new(__FILE__).join('..')
    data_dir = root + '../../docs/js/data'

    if !Dir.exist?(data_dir) then
        Dir.mkdir(data_dir)
    end
    
    # TODO figure out correct syntax for building path to index.json file
    index_path = File.join(data_dir, 'index.json')

    index_json = File.new(index_path, 'w')

    @json = []
    index = 0

    for page in site.pages
        if page['searchable'] == true then
            url = page['permalink']
            title = page['title'].strip() # remove trailing and leading spaces, plus newline characters

            content = page['content']

            if content != nil then
                html = Nokogiri::HTML.fragment(content)

                html.css('.topic').each do |section|
                    section_anchor = section.css('.topic-anchor')[0]

                    if section_anchor != nil then
                        if section_anchor.text != nil then
                            section_href = section_anchor['id']
                            anchor_link = "%s#%s" % [url, section_href]

                            section_title = section_anchor.text.strip() # remove trailing and leading spaces, plus newline characters

                            section_content = section.css('.topic-content')[0]

                            if section_content != nil then
                                if section_content.text != nil then
                                    section_body = Loofah.fragment(section_content.text).scrub!(:strip).text.delete!("\t\r\n").strip()

                                    # Need to build a JSON object, like so:
                                    # { "id":"", "title":"", "body":"", "url":"" }
                                    doc = {
                                        "id" => index,
                                        "title" => section_title,
                                        "url" => anchor_link,
                                        "body" => section_body
                                    }

                                    @json.push(doc)

                                    index = index + 1
                                end
                            end
                        end
                    end
                end # sections to read 
            end

            index += 1
        end
    end
    
    # If we found any sections, write the index
    if @json.length > 0
        # pipe generated JSON into file
        index_json.puts(::JSON.generate(@json, quirks_mode: true))
    end
    
    # write contents of index to file?
    index_json.close()
end