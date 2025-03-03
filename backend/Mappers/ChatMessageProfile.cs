using AutoMapper;
using BackendEvoltis.Entities;
using BackendEvoltis.Dtos.ChatMessage;

namespace BackendEvoltis.Mappers
{
    public class ChatMessageProfile : Profile
    {
        public ChatMessageProfile()
        {
            CreateMap<NewChatMessage, ChatMessage>()
                .ForMember(dest => dest.ChatId, opt => opt.MapFrom(src => src.ChatId))
                .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.SentAt, opt => opt.MapFrom(src => src.Timestamp))
                .ForMember(dest => dest.SenderType, opt => opt.MapFrom(src => src.SenderType))
                .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
                .ForMember(dest => dest.AIId, opt => opt.MapFrom(src => src.AIId));

            CreateMap<ChatMessage, ShowChatMessage>()
               .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
               .ForMember(dest => dest.Timestamp, opt => opt.MapFrom(src => src.SentAt))
               .ForMember(dest => dest.SenderType, opt => opt.MapFrom(src => src.SenderType))
               .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Sender.Name));
            
        }
    }
}
