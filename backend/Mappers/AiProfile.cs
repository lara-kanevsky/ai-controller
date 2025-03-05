using AutoMapper;
using BackendEvoltis.Dtos;
using BackendEvoltis.Dtos.Ai;
using BackendEvoltis.Entities;

namespace BackendEvoltis.Mappers
{
    public class AiProfile : Profile
    {
        private readonly TokenEncryptionService _encryptionService;

        public AiProfile(TokenEncryptionService encryptionService)
        {
            _encryptionService = encryptionService;


            CreateMap<NewAi, Ai>()
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => HashedString.FromRawString(src.Key)))
                .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId))
                .ForMember(dest => dest.Model, opt => opt.MapFrom(src => src.Model))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url));
            CreateMap<Ai, ShowAi>()
                .ForMember(dest => dest.UnhashedKey, opt => opt.MapFrom(src => _encryptionService.Decrypt(src.Key)))
                .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId))
                .ForMember(dest => dest.Model, opt => opt.MapFrom(src => src.Model))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url));
        }
    }
}
