get '/' do
  erb :meditate_intro
end

get '/meditate' do
  @breathes = params[:breathes]
  erb :meditate
end