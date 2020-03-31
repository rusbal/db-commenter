class CommenterController < ApplicationController
  before_action :load_comments

  def index
    tables = ActiveRecord::Base.connection.execute(sql).to_a
    @models = []

    tables.each do |table|
      model = table["Name"].delete_suffix("s").camelize

      @models << {
        name: table["Name"],
        model: Object.const_set(model, Class.new(ActiveRecord::Base))
      }
    end
  end

  def create
    require 'yaml'

    array_of_hashes = [{:"client-1.domaine.net"=>"www.client-1.domaine.net/index.html/xxxxxx"},{:"client-2.domaine.net"=>"www.client-2.domaine.net/index.html/xxxxxx"}]

    File.open(output, "w") do |file|
       file.write array_of_hashes.to_yaml
    end
  end

 private

  def load_comments
    @comments
  end

  def output
    Rails.root.join('db/comments.yml')
  end

  def sql
    <<-SQL
      SELECT n.nspname as "Schema",
        c.relname as "Name",
        CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' WHEN 'm' THEN 'materialized view' WHEN 'i' THEN 'index' WHEN 'S' THEN 'sequence' WHEN 's' THEN 'special' WHEN 'f' THEN 'foreign table' WHEN 'p' THEN 'table' WHEN 'I' THEN 'index' END as "Type",
        pg_catalog.pg_get_userbyid(c.relowner) as "Owner"
      FROM pg_catalog.pg_class c
           LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relkind IN ('r','p','')
            AND n.nspname <> 'pg_catalog'
            AND n.nspname <> 'information_schema'
            AND n.nspname !~ '^pg_toast'
        AND pg_catalog.pg_table_is_visible(c.oid)
      ORDER BY 1,2;
    SQL
  end

end
