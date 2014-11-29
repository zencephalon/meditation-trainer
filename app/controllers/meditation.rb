post '/meditation' do
  p params
  med_params = {}
  params[:meditation].each do |phase, stats|
    stats.each do |stat, value|
      med_params[phase + "_" + stat] = value
    end
  end
  p med_params
  meditation = Meditation.new(med_params)
end