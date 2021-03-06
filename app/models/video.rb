# == Schema Information
#
# Table name: videos
#
#  id          :integer          not null, primary key
#  speaker_id  :integer
#  topic_id    :integer
#  language_id :integer
#  code        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  length      :integer
#  category_id :integer
#

class Video < ActiveRecord::Base
  belongs_to :speaker
  belongs_to :topic
  belongs_to :language
  belongs_to :category
  has_and_belongs_to_many :cues
  has_many :writing_prompts
  has_many :video_scripts
end
