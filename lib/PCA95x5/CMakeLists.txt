add_library(PCA95x5 PCA95x5.h)
target_link_libraries(PCA95x5 PUBLIC BitBang_I2C)
target_include_directories(PCA95x5 INTERFACE .)
target_include_directories(PCA95x5 PUBLIC
BitBang_I2C
)
