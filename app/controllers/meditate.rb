get '/' do
  erb :meditate_intro
end

get '/meditate' do
  @breaths = params[:breaths]
  erb :meditate
end